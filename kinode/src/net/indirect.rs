use crate::net::types::{IdentityExt, NetData, Peer, TCP_PROTOCOL, WS_PROTOCOL};
use crate::net::{connect, tcp, utils, ws};
use lib::types::core::{Identity, NodeRouting};
use tokio::{sync::mpsc, time};

pub async fn maintain_routers(ext: IdentityExt, data: NetData) -> anyhow::Result<()> {
    println!("maintain_routers\r");
    let NodeRouting::Routers(ref routers) = ext.our.routing else {
        return Err(anyhow::anyhow!("net: no routers to maintain"));
    };
    loop {
        for router_name in routers {
            if data.peers.contains_key(router_name.as_str()) {
                // already connected to this router
                continue;
            }
            let Some(router_id) = data.pki.get(router_name.as_str()) else {
                // router does not exist in PKI that we know of
                continue;
            };
            connect_to_router(&router_id, &ext, &data).await;
        }
        time::sleep(time::Duration::from_secs(4)).await;
    }
}

pub async fn connect_to_router(router_id: &Identity, ext: &IdentityExt, data: &NetData) {
    println!("connect_to_router\r");
    utils::print_debug(
        &ext.print_tx,
        &format!("net: attempting to connect to router {}", router_id.name),
    )
    .await;
    let (peer_tx, peer_rx) = mpsc::unbounded_channel();
    data.peers.insert(
        router_id.name.clone(),
        Peer {
            identity: router_id.clone(),
            routing_for: false,
            sender: peer_tx.clone(),
        },
    );
    if let Some(port) = router_id.get_protocol_port(TCP_PROTOCOL) {
        match tcp::init_direct(ext, data, &router_id, port, true, peer_rx).await {
            Ok(()) => return,
            Err(peer_rx) => {
                return connect::handle_failed_connection(ext, data, router_id, peer_rx).await;
            }
        }
    }
    if let Some(port) = router_id.get_protocol_port(WS_PROTOCOL) {
        match ws::init_direct(ext, data, &router_id, port, true, peer_rx).await {
            Ok(()) => return,
            Err(peer_rx) => {
                return connect::handle_failed_connection(ext, data, router_id, peer_rx).await;
            }
        }
    }
}

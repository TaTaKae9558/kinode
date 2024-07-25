import useHomepageStore from "../store/homepageStore"
import AppDisplay from "./AppDisplay"

const AllApps: React.FC<{ expanded: boolean }> = () => {
  const { apps } = useHomepageStore()

  return <div>
    {apps.length === 0
      ? <div>Loading apps...</div>
      : apps.map(app => <AppDisplay key={app.package_name} app={app} />)}
  </div>
}

export default AllApps
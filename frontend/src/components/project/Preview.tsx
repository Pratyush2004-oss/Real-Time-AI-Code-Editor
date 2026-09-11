import type { FileTreeType } from "../../features/files/types"

interface PreviewProps { 
  tree : FileTreeType[]
}
const Preview = ({tree }: PreviewProps) => {
  return (
    <div>Preview</div>
  )
}

export default Preview
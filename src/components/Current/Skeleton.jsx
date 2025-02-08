import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={1200}
    height={650}
    viewBox="0 0 1200 650"
    backgroundColor="#4793ff20"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="20" ry="20" width="400" height="255" /> 
    <rect x="450" y="0" rx="20" ry="20" width="720" height="255" /> 
    <rect x="0" y="305" rx="7" ry="7" width="140" height="36" />
    <rect x="0" y="355" rx="20" ry="20" width="1170" height="250" />
  </ContentLoader>
)

export default Skeleton
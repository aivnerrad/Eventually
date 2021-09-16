import "./Logo.css";

export default function Logo() {
  const logo = "https://previews.123rf.com/images/cherezoff/cherezoff1701/cherezoff170100318/69294923-green-grass-letter-e-isolated-on-white-background-font-for-your-design-3d-illustration.jpg"
  return (
  <div id="logo-div">
    <img src={logo} alt =""/>
    <h2>ventually...</h2>
  </div>
  )
}

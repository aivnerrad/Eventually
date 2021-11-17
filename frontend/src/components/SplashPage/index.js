import React from "react";
import SalesList from "../SalesList/SalesList";
import SplashImage from "../SplashPageDisplayImage";
import "./SplashPage.css"

function SplashPage() {
  return (
    <div id="splash-page">
      <SplashImage />
      <SalesList />
    </div>
  )
}

export default SplashPage

import React from "react";
import customerStyles from "@/app/customer/page.module.css";

type PopUpProp = {
    
}

export function PopUp({} : PopUpProp) {
    export let showPopUp: boolean;
    export let setPopUp: Function;
    [showPopUp, setPopUp] = React.useState(false);


    return (
        <section id={customerStyles["pop-up"]}>
          {/* Exit button */}
          <button 
            className={customerStyles["exit-button"]} 
            onClick={setPopUp(false)}
            >
            X
          </button>
        </section>
    );
}

import React from "react";
import styles from "../Styles/ComponentStyles/CookingInstructions.module.css";

function CookingInstructionsForm({ setShowForm, inst, setInst }) {
  return (
    <div className={styles.main}>
      
        <button
          onClick={() => setShowForm(false)}
          className={styles.closeButton}
        >
          X
        </button>
        <div className={styles.inner}>
          <p className={styles.head}>Add Cooking instructions</p>
          <div className={styles.textareadiv}>
            <textarea className={styles.textarea} value={inst} onChange={(e)=>setInst(e.target.value)}></textarea>
          </div>
          <p className={styles.tag}>
            This restaurant will try it's best to follow your request. However,
            refunds and cancellations in this regard won't be possible{" "}
          </p>
        </div>
      
      <div className={styles.buttons}>
        <button className={styles.cancel} onClick={()=>setShowForm(false)}>Cancel</button>
        <button className={styles.next} onClick={()=>{
            localStorage.setItem('instructions', inst)
            setShowForm(false)}}>Next</button>
      </div>
    </div>
  );
}

export default CookingInstructionsForm;

import React, { useState } from 'react'
import styles from '../Styles/ComponentStyles/UserDetails.module.css'
import { addUser } from '../libs/services'
import toast from 'react-hot-toast'

function UserDetailsForm({showForm, setuser}) {
  const [pending, setPending] = useState(false)
   const [formData, setFormData]=useState({
    name:'',
    number:'',
    address:""
   })
const handleAaddUser = async()=>{
    if (formData.name.trim().length===0 || formData.number.trim().length===0 || formData.address.trim().length===0) {
        alert('please fill all the fields')
        return
    }
    const response = await addUser(formData)
    if(response.status===200 || response.status===201){
        setuser(response.data)
        showForm(false)
        toast.success('user details added succesfully')
        localStorage.setItem('currentUser', JSON.stringify(response.data))
        return
    }
    toast.error('error adding user details')

}


  return (
    <div className={styles.main}>
        <input type="text" className={styles.input} value={formData.name} placeholder='Name' onChange={(e)=>setFormData({...formData, name:e.target.value})}/>
        <input type="text" className={styles.input} value={formData.number} placeholder='Number' onChange={(e)=>setFormData({...formData, number:e.target.value})}/>
       <input type="text" className={styles.input} value={formData.address} placeholder='Address' onChange={(e)=>setFormData({...formData, address:e.target.value})}/>
        <button onClick={()=>{
          handleAaddUser()
          setPending(true)
        }
          } className={styles.next} >{pending?"...":"Next"}</button>
      
    </div>
  )
}

export default UserDetailsForm

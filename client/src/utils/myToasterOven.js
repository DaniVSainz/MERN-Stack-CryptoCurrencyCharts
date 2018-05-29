import { toast } from 'react-toastify';

export default (response) =>{
  if(response.status === 400){
    console.log('error Toast')
    return toast.error(response.data.msg, {
      position: toast.POSITION.TOP_CENTER
    });
  }
}
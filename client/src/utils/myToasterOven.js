import { toast } from 'react-toastify';

export default (response) =>{
  if(response.status === 400){
    toast.error(response.data.msg, {
      position: toast.POSITION.TOP_CENTER,
      className: "errorToast toastShadow",
      autoClose: 10000
    });
  }else if(response.status === 200){
    toast.success(response.data.msg, {
      position: toast.POSITION.TOP_CENTER,
      className: "successToast toastShadow",
      autoClose: 10000
    });
  }else{
    toast(response.data.msg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 10000
    });
  }
}
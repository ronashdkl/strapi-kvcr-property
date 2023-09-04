// import Swal from "sweetalert2";
import { repository } from "../api/property";
import { setLoading, setPropertyAmenities } from "../store/property";
import instance from "../utils/axiosInstance";

export default function usePropertyAmenities(propertyId,dispatch) {
  const fetchItems = async () => {
    const { data } = await repository.getPropertyAmenities(propertyId);
    return data;
  };

 async function link({property,amenitie,description,id}) {
    console.log({property,amenitie,description,id});

    if(id){
      //update description
      dispatch(setLoading())
        await instance.post(`/kvcr-property/property/amenities/${id}`,{
            description:description??null
        })
        dispatch(setPropertyAmenities(await fetchItems()))
        return;
    }
    if(typeof property == 'number' && typeof amenitie=='number'){
       //create / link amenities
       dispatch(setLoading())
        await instance.post(`/kvcr-property/property/${propertyId}/amenities`,{
            property,
            amenitie
        })
        
       dispatch(setPropertyAmenities(await fetchItems()))
        return;
    }
  }
  async function unLink(id,setConfirmModal) {
    dispatch(setLoading())
    await instance.delete(`/kvcr-property/property/amenities/${id}`)
    setConfirmModal(false)
   dispatch(setPropertyAmenities(await fetchItems()))
  }
  return {
    link,
    unLink,
    fetchItems,
  };
}

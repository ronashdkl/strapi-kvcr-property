import QueryString from 'qs';
import axiosInstance from '../utils/axiosInstance'

export const repository = {
    getPropertyAmenities:async(id)=>{
        return await axiosInstance.get(`/kvcr-property/property/${id}/amenities`)
    },
    linkPropertyAmenity:async(id,data)=>{
        return await axiosInstance.post(`/kvcr-property/property/${id}/amenities`,data)
    },
    getAllProperties:async(data = {})=>{
        const query = new QueryString.stringify(data,{
            encodeValuesOnly: true,
        })
        return await request('/kvcr-property/properties?'+query,{
            method:'GET'
        })
    },
    getAmenitiesCategories:async()=>{
        ///api/amenitie-categories?populate=amenities
        return await axiosInstance.get(`/kvcr-property/amenities`)
    }
}
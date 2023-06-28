import axios from "axios";



const createService = async (formData) => {

    try {
        const response = await axios.post(`http://localhost:5000/api/services`, formData);
        alert(response)
        console.log(response)
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};


const getserviceList = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/services`);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getServiceNameById = async (serviceId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/services/${serviceId}`);
        return response.data.name;
    } catch (error) {
        console.log(error);
        return null;
    }
}


const deleteServiceTimeById = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/time/${id}`);

    } catch (error) {
        console.log(error);
        return null;
    }
}


const createTime = async (formData) => {
    try {
        const resposne = await axios.post(`http://localhost:5000/api/time`, formData);
        alert(resposne)
    }
    catch (error) {
        console.log(error)
    }
}

const getserviceTimeList = async (formData) => {
    try {
        const resposne = await axios.get(`http://localhost:5000/api/time`);
        return resposne;

    }
    catch (error) {
        console.log(error)
    }
}


const createServicePrice = async (formData) => {
    try {
        const resposne = await axios.post(`http://localhost:5000/api/customerRate`, formData);
        alert(resposne)
    }
    catch (error) {
        console.log(error)
    }
}

const getServicePriceList = async () => {
    try {
        const resposne = await axios.get(`http://localhost:5000/api/customerRate`);
        return resposne;
    }
    catch (error) {
        console.log(error)
    }
}

const deleteServicePrice = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/customerRate/${id}`);

    } catch (error) {
        console.log(error);
        return null;
    }
}


const createMaterial = async (formData) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/materials/`, formData);
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteMaterialById = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/materials/${id}`);
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getMaterialList = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/materials/`);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}


const getMaterialTax = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/MaterialTax/`);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const createMaterialTax = async (formData) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/MaterialTax/`);

        if (response.data.length === 0) {
            await axios.post(`http://localhost:5000/api/MaterialTax/`, formData);
        }
        else {
            const id = response.data[0]._id;
            await axios.put(`http://localhost:5000/api/MaterialTax/${id}`, formData);
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}




const getLabourRate = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/LabourRates/`);
        console.log(response)
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getLabourRateByServiceId = async (serviceId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/LabourRates/service/${serviceId}`);
        console.log(response)
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const createLabourRate = async (formData) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/LabourRates/`);
        const sortedResponse = response.data.filter(item => item.service_id === formData.service_id && item.number_of_installs === formData.number_of_installs);
        if (sortedResponse.length > 0) {
            await axios.put(`http://localhost:5000/api/LabourRates/${sortedResponse[0]._id}`, formData);
        } else {
            await axios.post(`http://localhost:5000/api/LabourRates/`, formData);
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteLabourRate = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/LabourRates/${id}`);
    } catch (error) {
        console.log(error);
        return null;
    }
}


const getInstallerList = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/installer`);
        return response;
    } catch (error) {
        console.log(error);
    }
}



const getCountInstaller = async()=>{
    try {
        const response = await axios.get(`http://localhost:5000/api/installer`);
        return response.data.length;
    } catch (error) {
        console.log(error);
    }
}


const createInstaller = async (formData) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/installer/`, formData);
        console.log(response)

    } catch (error) {
        console.log(error);
        return null;
    }
}



const getMostSuitableInstaller = async (formData) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/booking/installer_mapping`, formData);
        return response;
    }
    catch (error) {
        console.log(error);

    }
}


const createBooking = async (formData) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/booking/`, formData);
        console.log(response)
    }
    catch (error) {
        console.log(error);

    }
}



const createAdmin = async (formData) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/admins/`, formData);
        console.log(response)
    }
    catch (error) {
        console.log(error);

    }
}

const validateAdmin = async (formData) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/admins/validate`, formData);
        return response;
    }
    catch (error) {
        console.log(error);

    }
}


const getBookingsList = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/booking`);
        return response;
    } catch (error) {
        console.log(error);
    }
}


const getBookingCount = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/booking`);
        return response.data.length;
    } catch (error) {
        console.log(error);
    }
}


const deleteBooking = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/booking/${id}`);
        return response;
    } catch (error) {
        console.log(error);
    }
}


const updateBooking = async (id, dataObject) => {
    try {



        const dataToBePushed = {
            id: dataObject._id,
            date: dataObject.date,
            time_start: dataObject.time_start,
            time_end: dataObject.time_end,
            number_of_installs: dataObject.number_of_installs,
            materialCost: dataObject.materialCost,
            materialTax: dataObject.materialTax,
            material_details: dataObject.material_details,
            customerShowingCost: dataObject.customerShowingCost,
            paymentStatus: dataObject.paymentStatus,
            completionStatus: dataObject.completionStatus,
            installer: dataObject.installer,
            service: dataObject.service_id,
            machinePurchasedByUser: dataObject.machinePurchasedByUser,
            labourRates: dataObject.labourRates,
        };


        const response = await axios.patch(`http://localhost:5000/api/booking/${id}`, dataToBePushed);
        return response;
    } catch (error) {
        console.log(error);
    }
}



const getAdminData = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/admins/`);
        return response;
    } catch (error) {
        console.log(error);
    }
}


const deleteAdmin = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/admins/${id}`);
        return response;
    } catch (error) {
        console.log(error);
    }
}




const updateAdmin = async (id, dataObject) => {
    try {



        const dataToBePushed = {
            id: dataObject._id,
            name: dataObject.name,
            email: dataObject.email,
            phoneNumber: dataObject.phoneNumber,
            address: dataObject.address,
            password: dataObject.password,
            roles:dataObject.roles

        };


        const response = await axios.put(`http://localhost:5000/api/admins/${id}`, dataToBePushed);
        console.log(response)
        return response;
    } catch (error) {
        console.log(error);
    }
}



const deleteInstaller = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/installer/${id}`);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const updateInstaller = async (id, dataObject) => {
    try {
      const dataToBePushed = {
        id: dataObject._id,
        shown_id: `RC-I-${dataObject._id}`,
        firstName: dataObject.firstName,
        lastName: dataObject.lastName,
        companyName: dataObject.companyName,
        email: dataObject.email,
        password: dataObject.password,
        phoneNumber: dataObject.phoneNumber,
        yearsOfExperience: dataObject.yearsOfExperience,
        description: dataObject.description,
        addressLine1: dataObject.addressLine1,
        addressLine2: dataObject.addressLine2,
        city: dataObject.city,
        zip: dataObject.zip,
        miles_distance: dataObject.miles_distance,
        state: dataObject.state,
        licenseNumber: dataObject.licenseNumber,
        licenseExpirationDate: dataObject.licenseExpirationDate,
        businessInsuranceCompany: dataObject.businessInsuranceCompany,
        businessInsuranceNumber: dataObject.businessInsuranceNumber,
        businessAgentPhoneNumber: dataObject.businessAgentPhoneNumber,
        businessPolicyNumber: dataObject.businessPolicyNumber,
        businessInsuranceEffectiveStartDate: dataObject.businessInsuranceEffectiveStartDate,
        businessInsuranceEffectiveEndDate: dataObject.businessInsuranceEffectiveEndDate,
        bondingCertificationNumber: dataObject.bondingCertificationNumber,
        bondingCompany: dataObject.bondingCompany,
        bondingAgentPhoneNumber: dataObject.bondingAgentPhoneNumber,
        bondAmount: dataObject.bondAmount,
        bondingEffectiveStartDate: dataObject.bondingEffectiveStartDate,
        bondingEffectiveEndDate: dataObject.bondingEffectiveEndDate,
        services: dataObject.services
      };
  
      const response = await axios.put(`http://localhost:5000/api/installer/${id}`, dataToBePushed);
      console.log(response)
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  





export { getBookingCount,getCountInstaller,getAdminData, deleteAdmin, updateAdmin, deleteInstaller,updateInstaller, createService, createTime, getserviceList, getServiceNameById, getserviceTimeList, deleteServiceTimeById, createServicePrice, getServicePriceList, deleteServicePrice, createMaterial, deleteMaterialById, getMaterialList, getMaterialTax, createMaterialTax, getLabourRate, createLabourRate, deleteLabourRate, getInstallerList, createInstaller, getMostSuitableInstaller, createBooking, createAdmin, validateAdmin, getLabourRateByServiceId, getBookingsList, deleteBooking, updateBooking }

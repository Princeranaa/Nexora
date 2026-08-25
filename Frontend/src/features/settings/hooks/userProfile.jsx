import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../service/profileApi";
import { setEmployee } from "../../auth/auth.slice";

const userProfile = () => {
  const dispatch = useDispatch();

  const { employee } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    bio: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (employee) {
      setFormData({
        firstname: employee.fullname?.firstname || "",
        lastname: employee.fullname?.lastname || "",
        email: employee.email || "",
        // bio: employee.bio || "",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsUpdating(true);

      const payload = {
        fullname: {
          firstname: formData.firstname,
          lastname: formData.lastname,
        },
        email: formData.email,
        bio: formData.bio,
      };

      const response = await updateProfile(payload);
      dispatch(setEmployee(response.user));

      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Profile update failed:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isUpdating,
  };
};

export default userProfile;

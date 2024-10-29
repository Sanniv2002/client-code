import { userAtom } from "@/store/atoms/user";
import { useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToastContext } from "./Toast/ToastProvider";
import AnimateIn from "./AnimateIn";

export const EditProfile = () => {
    const user = useRecoilValue(userAtom);
    const [institutionType, setInstitutionType] = useState(user?.institution_type || "");
    const [loading, setLoading] = useState(false);
    const { addToast } = useToastContext()

    const institutionTypes = [
        "University",
        "College",
        "High School",
        "Middle School",
        "Primary School",
        "Research Institute",
        "Technical Institute",
        "Online Academy",
    ];

    useEffect(() => {
        if (user?.institution_type) {
            setInstitutionType(user.institution_type);
        }
    }, [user?.institution_type]);

    const handleInstitutionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setInstitutionType(e.target.value);
    };

    const handleUpdateProfile = async () => {
        setLoading(true);
        try {
            const requestBody = {
                name: user.name,
                institution_type: institutionType,
                email: user.email
            }
            await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/update`, requestBody, {
                withCredentials: true
            })
            addToast({
                type: "Profile Updated Succesfully!",
                who: "Scriptbot",
                content: "Your profile has been updated succesfully!",
                time: "A second ago",
                src: "/robot.png"
            });
        } catch (error) {
            addToast({
                type: "Something went wrong",
                who: "Scriptbot",
                content: "We are very sorry we could not update your profile details.",
                time: "A second ago",
                src: "/robot.png"
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full p-4 flex flex-col justify-between flex-1 relative">
            <section>
                <div className="flex items-center justify-between mb-3">
                    <h5 className="text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                        Edit Profile
                    </h5>
                </div>
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    For now you can only update your institution type.
                </p>
                <AnimateIn
                    from="opacity-0 scale-105"
                    to="opacity-100 scale-100"
                >
                    <div className="mt-4">
                        <label htmlFor="institutionType" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Institution Type
                        </label>
                        <select
                            id="institutionType"
                            value={institutionType}
                            onChange={handleInstitutionChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        >
                            <option value="" disabled>Select Institution Type</option>
                            {institutionTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                </AnimateIn>
                <button
                    onClick={handleUpdateProfile}
                    disabled={loading}
                    className={`mt-6 px-4 py-2 text-sm font-medium text-blue-800 rounded-lg ${loading ? "bg-blue-300" : "bg-blue-200 hover:bg-blue-100"
                        } transition-colors duration-200`}
                >
                    {loading ? "Updating..." : "Update Profile"}
                </button>
            </section>
        </div>
    );
};

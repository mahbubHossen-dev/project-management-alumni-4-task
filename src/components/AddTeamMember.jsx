import React from 'react';
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from '../hooks/useAxiosSecure';
const AddTeamMember = ({ project,refetch }) => {

    const [member, setMember] = useState('');
    const axiosSecure = useAxiosSecure();

    

    const handleAddMember = async (e) => {
        e.preventDefault()
        if (!member.trim()) {

            return Swal.fire({
                icon: "error",
                title: "Enter member name"
            });
        }

        try {

            const { data } =
                await axiosSecure.patch(
                    `/projects/add-member/${project._id}`,
                    {
                        member
                    }
                );

            if (data.acknowledged) {

                setMember('');
                
                const modal = document.getElementById(
                    `member_modal_3`
                );
                refetch()

                modal?.close();

                Swal.fire({
                    icon: "success",
                    title: "Member Added",
                    timer: 1500,
                    showConfirmButton: false
                });
            }

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text:
                    error.response?.data?.message
            });
        }
    };


    return (
        <div>
            <dialog
                id={`member_modal_3`}
                className="modal"
            >
                <div className="modal-box">

                    <h3 className="font-bold text-xl mb-4">
                        Add Team Member
                    </h3>

                    <form
                        onSubmit={handleAddMember}
                        className="space-y-4"
                    >

                        <input
                            type="text"
                            placeholder="Enter Member Name"
                            value={member}
                            onChange={(e) =>
                                setMember(e.target.value)
                            }
                            className="input input-bordered w-full"
                            required
                        />

                        <div className="flex justify-end gap-2">

                            <button
                                type="button"
                                className="btn"
                                onClick={() =>
                                    document
                                        .getElementById(
                                            `member_modal_3`
                                        )
                                        .close()
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Add Member
                            </button>

                        </div>

                    </form>

                </div>
            </dialog>
        </div>
    );
};

export default AddTeamMember;
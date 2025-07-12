import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router";

const AddTask = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue, // ✅ now setValue is correctly extracted
    formState: { errors },
  } = useForm();

  // ✅ Image Upload Handler
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
        formData
      );
      const url = res.data.data.url;
      setValue("task_image_url", url); // ✅ set hidden input value
    } catch (err) {
      Swal.fire("Upload Error", "Image upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Form Submission
  const onSubmit = async (data) => {
    const { required_workers, payable_amount } = data;
    const totalCost = parseInt(required_workers) * parseInt(payable_amount);

    try {
      const res = await axiosSecure.get(`/users/${user.email}`);
      const currentCoins = res.data.coins;

      if (totalCost > currentCoins) {
        Swal.fire({
          icon: "error",
          title: "Insufficient Coins",
          text: "Not enough coins. Please purchase more.",
        });
        return navigate("/dashboard/purchase-coin");
      }

      const task = {
        ...data,
        required_workers: parseInt(required_workers),
        payable_amount: parseInt(payable_amount),
        buyer_email: user.email,
        total_cost: totalCost,
        createdAt: new Date(),
      };

      // ✅ Check if all values are correct
      console.log("Submitting task:", task);

      await axiosSecure.post("/tasks", task);

      // ✅ Deduct coins from buyer
      await axiosSecure.patch(`/users/${user.email}/coins`, {
        coins: currentCoins - totalCost,
      });

      Swal.fire({ icon: "success", title: "Task Added Successfully" });
      reset();
      navigate("/dashboard/my-tasks");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded my-6">
      <h2 className="text-xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Task Title</label>
          <input
            {...register("task_title", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.task_title && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div>
          <label className="label">Task Detail</label>
          <textarea
            {...register("task_detail", { required: true })}
            className="textarea textarea-bordered w-full"
          />
          {errors.task_detail && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Required Workers</label>
            <input
              type="number"
              {...register("required_workers", { required: true, min: 1 })}
              className="input input-bordered w-full"
            />
            {errors.required_workers && (
              <span className="text-red-500">Enter a valid number</span>
            )}
          </div>

          <div>
            <label className="label">Payable Amount (per worker)</label>
            <input
              type="number"
              {...register("payable_amount", { required: true, min: 1 })}
              className="input input-bordered w-full"
            />
            {errors.payable_amount && (
              <span className="text-red-500">Enter a valid amount</span>
            )}
          </div>
        </div>

        <div>
          <label className="label">Completion Date</label>
          <input
            type="date"
            {...register("completion_date", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.completion_date && (
            <span className="text-red-500">Select a date</span>
          )}
        </div>

        <div>
          <label className="label">What to Submit</label>
          <input
            {...register("submission_info", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.submission_info && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div>
          <label className="label">Task Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full"
          />
          {uploading && (
            <p className="text-sm text-blue-500">Uploading image...</p>
          )}
        </div>

        {/* Hidden input for task_image_url */}
        <input
          type="hidden"
          {...register("task_image_url", { required: true })}
        />
        {errors.task_image_url && (
          <p className="text-red-500">Image is required</p>
        )}

        <button
          type="submit"
          className="btn btn-warning w-full text-white font-bold"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;

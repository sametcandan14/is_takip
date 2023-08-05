import React from "react";
import { statusOptions, typeOptions } from "../constants";
import { v4 } from "uuid";
import { addJob } from "../redux/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    //form verilerinden bir obje oluşturma

    const dataObj = Object.fromEntries(formData);

    dataObj.id = v4();

    //eklenme tarihi oluşturma

    dataObj.date = new Date().toLocaleDateString();

    // API yi güncelleme

    axios.post("http://localhost:3030/jobs", dataObj).then(() => {
      dispatch(addJob(dataObj));
      navigate("/");

      toast.success("ccc", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    });
  };
  return (
    <div className="add-sec">
      <h2>Yeni İş Ekle</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Pozisyon</label>
          <input name="position" type="text" />
        </div>
        <div className="field">
          <label>Şirket</label>
          <input name="company" type="text" />
        </div>
        <div className="field">
          <label>Lokasyon</label>
          <input name="location" type="text" />
        </div>
        <div className="field">
          <label>Durum</label>
          <select name="status">
            {statusOptions.map((opt, i) => (
              <option key={i}> {opt.label}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Tür</label>
          <select name="type">
            {typeOptions.map((opt, i) => (
              <option key={i}> {opt.label}</option>
            ))}
          </select>
        </div>
        <button>Ekle</button>
      </form>
    </div>
  );
};

export default AddJob;

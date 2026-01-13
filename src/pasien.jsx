import { useEffect, useState } from "react";
import api from "./api";
import "./pasien.css";

export default function Pasien() {
  const [pasiens, setPasiens] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    alamat: "",
    umur: "",
    jenis_kelamin: "L",
  });
  const [editId, setEditId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("/login");
      return;
    }
    load();
  }, []);

  const load = async () => {
    const res = await api.get("/pasien");
    setPasiens(res.data);
  };

  const submit = async () => {
    if (!form.nama || !form.alamat || !form.umur) {
      alert("Semua field wajib diisi");
      return;
    }

    editId
      ? await api.put(`/pasien/${editId}`, form)
      : await api.post("/pasien", form);

    setForm({ nama: "", alamat: "", umur: "", jenis_kelamin: "L" });
    setEditId(null);
    load();
  };

  const edit = (p) => {
    setForm(p);
    setEditId(p.id);
  };

  const del = async (id) => {
    if (confirm("Hapus data pasien?")) {
      await api.delete(`/pasien/${id}`);
      load();
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.replace("/login");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2 className="admin-title">RSUD HAT</h2>

        <ul className="menu-list">
          <li className="active">Dashboard</li>
        </ul>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <span>Dashboard</span>
          <div className="user-area">
            {user?.name}
            <button onClick={logout}>Logout</button>
          </div>
        </header>

        <div className="admin-content">
          
          <div className="box">
            <h3>{editId ? "Edit Pasien" : "Tambah Pasien"}</h3>

            <div className="form-grid">
              <input
                placeholder="Nama"
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
              />
              <input
                placeholder="Alamat"
                value={form.alamat}
                onChange={(e) => setForm({ ...form, alamat: e.target.value })}
              />
              <input
                type="number"
                placeholder="Umur"
                value={form.umur}
                onChange={(e) => setForm({ ...form, umur: e.target.value })}
              />
              <select
                value={form.jenis_kelamin}
                onChange={(e) =>
                  setForm({ ...form, jenis_kelamin: e.target.value })
                }
              >
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
          
            <button className="btn-save" onClick={submit}>
              {editId ? "Update" : "Simpan"}
            </button>
          </div>

          <div className="box">
            <h3 >Data Pasien</h3>

            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>Umur</th>
                  <th>Jenis Kelamin</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pasiens.map((p, i) => (
                  <tr key={p.id}>
                    <td>{i + 1}</td>
                    <td>{p.nama}</td>
                    <td>{p.alamat}</td>
                    <td>{p.umur}</td>
                    <td>{p.jenis_kelamin}</td>
                    <td>
                      <button onClick={() => edit(p)}>Edit</button>
                      <button onClick={() => del(p.id)}>Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

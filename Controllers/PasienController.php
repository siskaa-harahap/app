<?php

namespace App\Http\Controllers;

use App\Models\Pasien;
use Illuminate\Http\Request;

class PasienController extends Controller
{
    public function index()
    {
        return Pasien::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama'=>'required',
            'alamat'=>'required',
            'umur'=>'required|numeric',
            'jenis_kelamin'=>'required'
        ]);

        return Pasien::create($request->all());
    }

    public function show($id)
    {
        return Pasien::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $pasien = Pasien::findOrFail($id);
        $pasien->update($request->all());

        return $pasien;
    }

    public function destroy($id)
    {
        Pasien::destroy($id);
        return response()->json(['message'=>'Data pasien dihapus']);
    }
}

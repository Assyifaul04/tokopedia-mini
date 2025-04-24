<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AdminAuthController extends Controller
{
    // Login admin
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Cek apakah email dan password valid untuk admin
        $admin = User::where('email', $request->email)->where('role', 'admin')->first();

        if ($admin && Hash::check($request->password, $admin->password)) {
            $token = $admin->createToken('YourAppName')->plainTextToken;
            return response()->json([
                'token' => $token,
                'role' => $admin->role,
                'name' => $admin->name,
            ]);
        }

        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }
}

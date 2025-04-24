<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    // Menampilkan semua item di cart pengguna
    public function index()
    {
        $user = Auth::user();
        $cartItems = Cart::where('user_id', $user->id)->with('product')->get();

        return response()->json([
            'success' => true,
            'data' => $cartItems
        ]);
    }

    // Menambahkan item ke dalam cart
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);
    
        try {
            $cart = Cart::create([
                'user_id' => auth()->user()->id,
                'product_id' => $validated['product_id'],
                'quantity' => $validated['quantity'],
            ]);
    
            return response()->json([
                'status' => 'success',
                'message' => 'Product added to cart successfully',
                'data' => $cart,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to add product to cart',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    

    // Mengupdate item di cart
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $user = Auth::user();
        $cartItem = Cart::where('user_id', $user->id)->find($id);

        if (!$cartItem) {
            return response()->json([
                'success' => false,
                'message' => 'Item tidak ditemukan di cart.'
            ], 404);
        }

        $cartItem->update([
            'quantity' => $validated['quantity']
        ]);

        return response()->json([
            'success' => true,
            'data' => $cartItem,
            'message' => 'Jumlah item berhasil diperbarui.'
        ]);
    }

    // Menghapus item dari cart
    public function destroy($id)
    {
        $user = Auth::user();
        $cartItem = Cart::where('user_id', $user->id)->find($id);

        if (!$cartItem) {
            return response()->json([
                'success' => false,
                'message' => 'Item tidak ditemukan di cart.'
            ], 404);
        }

        $cartItem->delete();

        return response()->json([
            'success' => true,
            'message' => 'Item berhasil dihapus dari cart.'
        ]);
    }
}

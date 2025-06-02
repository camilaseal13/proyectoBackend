
const CartModel = require("../models/Cart");

class CartManager {
  async getCartById(cartId) {
    return await CartModel.findById(cartId).populate("products.product").lean();
  }

  async createCart() {
    const newCart = new CartModel({ products: [] });
    return await newCart.save();
  }

  async addProductToCart(cartId, productId) {
    const cart = await CartModel.findById(cartId);
    if (!cart) return null;

    const existingProduct = cart.products.find(p => p.product.toString() === productId);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await cart.save();
    return cart;
  }

  async removeProductFromCart(cartId, productId) {
    const cart = await CartModel.findById(cartId);
    if (!cart) return null;

    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    await cart.save();
    return cart;
  }

  async updateCart(cartId, products) {
    const cart = await CartModel.findById(cartId);
    if (!cart) return null;

    cart.products = products;
    await cart.save();
    return cart;
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await CartModel.findById(cartId);
    if (!cart) return null;

    const product = cart.products.find(p => p.product.toString() === productId);
    if (product) {
      product.quantity = quantity;
      await cart.save();
      return cart;
    }

    return null;
  }

  async clearCart(cartId) {
    const cart = await CartModel.findById(cartId);
    if (!cart) return null;

    cart.products = [];
    await cart.save();
    return cart;
  }
}

module.exports = CartManager;

import { call, put, takeLatest } from "@redux-saga/core/effects";
import { getAll } from "../../api/product";
import { ProductType } from "../../types/Product";
import { fetchProductList, fetchProductSuccess } from "./productSlice";

function* fetchProduct() {
  try {
    const products: ProductType[] = yield call(getAll);
    yield put(fetchProductSuccess(products));
  } catch (error) {
    return error
  }
}

export default function* productSaga() {
  yield takeLatest(fetchProductList, fetchProduct);
}
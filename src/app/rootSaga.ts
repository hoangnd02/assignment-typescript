import { all } from "@redux-saga/core/effects";
import productSaga from "../features/product/productSaga";

export default function* rootSaga() {
  yield all([productSaga()]);
}
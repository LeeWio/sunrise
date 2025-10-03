import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import { AppDispatch, RootState } from "@/app/store";

// Custom hook that returns the typed dispatch function for the Redux store
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook that returns the typed selector function for accessing the Redux store state
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DeleteType, FileState, isAddOpenType, RenameType } from "../types";

const initialState: FileState = {
    rename: { value: "", renamingNode: "" },
    isAddOpen: { folderId: "", type: null },
    isDeleteOpen : { file: null }
}

const FileOperationSlice = createSlice({
    name: "files-operation",
    initialState,
    reducers: {
        setRename: (state, action: PayloadAction<RenameType>) => { state.rename = action.payload },
        setIsAddOpen: (state, action: PayloadAction<isAddOpenType>) => { state.isAddOpen = action.payload },
        setIsDeleteOpen: (state, action: PayloadAction<DeleteType>) => { state.isDeleteOpen = action.payload },
    },
})

export const { setIsAddOpen, setRename, setIsDeleteOpen } = FileOperationSlice.actions;

export default FileOperationSlice.reducer;
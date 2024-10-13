import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({cabinToEdit = {}, onCloseModal}) {
  const {createCabin, isCreating} = useCreateCabin(); 
  const {isEditing, editCabin} = useEditCabin();
  const isWorking = isCreating || isEditing;
  const {id: editId, ...editValues} = cabinToEdit;
  const isEdiitSession = Boolean(editId);
  const {register, handleSubmit, reset, getValues, formState} = useForm({
    defaultValues: isEdiitSession ? editValues : {},
  }
  );
  const {errors} = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if(isEdiitSession) editCabin({newCabinData: {
      ...data, image}, id: editId}, {
        onSuccess: (data) => {
          reset();
          onCloseModal?.();
        },
      });
    else createCabin({...data, image: image}, {
      onSuccess: (data) => {     
        reset();
        onCloseModal?.();
      },
    });    
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Cabin name" error={errors?.name?.message} >
        <Input type="text" id="name" {...register("name", {
          required: "Cabin name is required",
        })} />
      </FormRow>

      <FormRow label="Max capacity" error={errors?.maxCapacity?.message} >
        <Input type="number" id="maxCapacity" {...register("maxCapacity", {
          required: "Maximum capacity is required",
          min: {
            value: 1,
            message: "Minimum capacity is 1",
          }
        })} />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" disabled={isWorking} {...register("regularPrice", {
          required: "Regular price is required",
          min: {
            value: 1,
            message: "Minimum price is 1",
          }
        })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} disabled={isWorking} {...register("discount", {
          required: "Discount is required",
          // validate: (value) => value <= getValues().regularPrice || "Discount must be less than regular price",

        })} />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message} >
        <Textarea type="number" id="description" disabled={isWorking} defaultValue="" {...register("description", {
          required: "Description is required",
        })} />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" type="file" {...register("image", {
          required: isEdiitSession ? false : "Cabin photo is required",
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}> {isEdiitSession ? "Edit cabin" : "Add cabin"} </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

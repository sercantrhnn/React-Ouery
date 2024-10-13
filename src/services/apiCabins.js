import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins_2").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be fetched");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/","");
  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins_2");

  if (!id) query = query.insert([{...newCabin, image: imagePath}]);

  if (id) query = query.update({...newCabin, image: imagePath})
    .eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be created");
  }

   if(hasImagePath) return data;

  const { error: storageError } = await supabase
  .storage
  .from('cabin-images')
  .upload(imageName, newCabin.image);

  if ( storageError) {
    await supabase.from("cabins_2").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error("Cabins image not be created");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins_2").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be delete");
  }
  return null;
}

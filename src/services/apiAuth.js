import supabase from "./supabase";

export async function signup({ fullName, email, password }) {
  console.log(fullName, email, password);
  
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
        data:{
            fullName: fullName,
            avatar: "",
        }
    }
  });
  console.log(data);
  
  if (error) {
    console.error("Hata:", error);
    throw new Error(error.message);
  }
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new error();
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  // console.log(data);

  if (error) throw new error();
  return data?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new error();
}

export async function updateCurrentUser({ fullName, avatar, password }) {
  let updateData;
  if(password) updateData = {password};
  if(fullName) updateData = {data: {fullName}};

  const {data, error} = await supabase.auth.updateUser(updateData);
  if (error) throw new error();
  if(!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const {error: storageError} = await supabase.storage.from("avatars").upload(fileName, avatar);
  if (storageError) throw new error(storageError.message);

  const {data: updateUser, error: error2} =await supabase.auth.updateUser({
    data: {
      avatar: `https://lxtizwiwgxycbdzhvxqp.supabase.co/storage/v1/object/public/avatars/${fileName}`,
    }
  })
  if (error2) throw new error(error2.message);
  return updateUser;
}

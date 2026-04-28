import { createClient } from "https://esm.sh/@supabase/supabase-js";

export const SUPABASE_URL = "https://znxehhmzcljvadjqlojx.supabase.co";
export const SUPABASE_KEY = "sb_publishable_nHsFGw9zZXRJi-70DoRIsA_DUESU5xO";

export const supabase = createClient( SUPABASE_URL, SUPABASE_KEY );

export async function getUsers() {
    const { data, error } = await supabase
        .from("users")
        .select("*");

    if (error) throw error;

    return data || [];
}

export async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error) throw error;

    return data;
}

export async function getProject(projectName, userName) {
    const { data, error } = await supabase
        .from("users")
        .select("projects")
        .ilike("nickname", userName)
        .single();

    if (error || !data) return null;

    return (data.projects || []).find(
        p =>
            p.fileName.toLowerCase() ===
            projectName.toLowerCase()
    );
}

export async function updateUser(user, keys, values) {
    const updates = {};

    keys.forEach((key, index) => {
        updates[key] = values[index];
    });

    const { data, error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", user.id)
        .select()
        .single();

    if (error) throw error;

    return data;
}

export async function registerUser(nickname, password) {
    const email = nickname.trim().toLowerCase() + "@site.local";

    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) throw error;

    const user = data.user;

    const { error: insertError } = await supabase
        .from("users")
        .upsert(
            {
                id: user.id,
                nickname,
                projects: []
            },
            { onConflict: "id" }
        );

    if (insertError) throw insertError;

    return user;
}

export async function loginUser(nickname, password) {
    const email = nickname.trim().toLowerCase() + "@site.local";

    const { data, error } =
        await supabase.auth.signInWithPassword({
            email,
            password
        });

    if (error) throw error;

    const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single();

    if (profileError || !profile) {
        await supabase.auth.signOut();
        throw new Error("PROFILE_NOT_FOUND");
    }

    return data.user;
}

export async function logoutUser() {
    await supabase.auth.signOut();
}

export async function deleteCurrentUser() {
    const user = await getCurrentUser();

    if (!user) return;

    await supabase
        .from("users")
        .delete()
        .eq("id", user.id);

    await supabase.auth.signOut();
}

export async function getCurrentEmail() {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) return null;

    return `@${user.email.split("@")[0]}`;
}

export async function hashPassword(password) {
    return password;
}

export async function updatePassword(newPassword) {
    const { data, error } = await supabase.auth.updateUser({
        password: newPassword
    });

    if (error) throw error;

    return data;
}

export async function isLoggedIn() {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
}
import { createClient } from '@/app/utils/supabase/server';

export default async function getUsers() {
    const supabase = createClient();
    const { data: users } = await supabase.from("users").select();

    return users;
}
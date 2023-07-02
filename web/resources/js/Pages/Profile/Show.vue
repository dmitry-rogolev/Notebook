<template>
    <AppLayout :title="$t('Profile')">
        <div class="flex flex-nowrap">
            <SidebarPartial />
            <div class="py-10 sm:px-6 lg:px-8 max-h-screen min-h-screen overflow-auto">
                <div>
                    <UpdateProfileInformationForm :user="$page.props.auth.user" />

                    <SectionBorder />
                </div>

                <div>
                    <UpdatePasswordForm class="mt-10 sm:mt-0" />

                    <SectionBorder />
                </div>

                <div>
                    <TwoFactorAuthenticationForm
                        :requires-confirmation="confirmsTwoFactorAuthentication"
                        class="mt-10 sm:mt-0"
                    />

                    <SectionBorder />
                </div>

                <LogoutOtherBrowserSessionsForm :sessions="sessions" class="mt-10 sm:mt-0" />

                <template v-if="$page.props.jetstream.hasAccountDeletionFeatures">
                    <SectionBorder />

                    <DeleteUserForm class="mt-10 sm:mt-0" />
                </template>
            </div>
        </div>
    </AppLayout>
</template>

<script>
import AppLayout from '@/Layouts/AppLayout.vue';
import SidebarPartial from './Partials/Sidebar.vue';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm.vue';
import LogoutOtherBrowserSessionsForm from '@/Pages/Profile/Partials/LogoutOtherBrowserSessionsForm.vue';
import SectionBorder from '@/Components/SectionBorder.vue';
import TwoFactorAuthenticationForm from '@/Pages/Profile/Partials/TwoFactorAuthenticationForm.vue';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm.vue';

export default {
    name: 'ProfilePage', 

    components: {
        AppLayout, 
        SidebarPartial, 
        UpdateProfileInformationForm, 
        SectionBorder, 
        DeleteUserForm, 
        LogoutOtherBrowserSessionsForm, 
        TwoFactorAuthenticationForm, 
        UpdatePasswordForm, 
    }, 

    props: {
        confirmsTwoFactorAuthentication: {
            type: Boolean, 
            required: true, 
        }, 
        sessions: {
            type: Array, 
            required: true, 
        }, 
    }, 

    mounted() {
        this.$store.dispatch('dark');
        this.$store.dispatch('locale');
        this.$i18n.locale = this.$store.state.locale;
    }, 
}
</script>

<style scoped>

</style>

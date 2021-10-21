<template>
    <loading-view :loading="loading">
        <template v-if="installation">
            <card class="p-4">
                <h1 class="mb-3">{{ __('Setup Guide') }}</h1>

                <p class="mb-2">{{ __('This will guide you through configuring the various Passport components that are required to make OAuth requests.') }}</p>

                <div class="flex items-start p-3">
                    <install-checklist-icon :valid="installation.has_published_config" />
                    <div>
                        <h3 class="font-normal mb-2">
                            {{ __('Publish Config') }}
                        </h3>
                        <p v-if="!installation.has_published_config" class="mb-2">{{ __('This will publish the Passport database migrations.') }}</p>
                        <progress-button
                            v-if="!installation.has_published_config"
                            class="btn btn-default mt-3"
                            :processing="publishingConfig"
                            @click.native="publishConfig">
                            {{ __('Publish Config') }}
                        </progress-button>
                        <progress-button
                            v-else
                            class="btn btn-default mt-3"
                            :processing="unpublishingConfig"
                            @click.native="unpublishConfig">
                            {{ __('Delete Config') }}
                        </progress-button>
                    </div>
                </div>
                
                <div class="flex items-start p-3">
                    <install-checklist-icon :valid="installation.has_ran_migrations" />
                    <div>
                        <h3 class="font-normal mb-2">
                            {{ __('Run Migrations') }}
                        </h3>
                        <p v-if="!installation.has_ran_migrations" class="mb-2">{{ __('This will publish and run the Passport migrations.') }}</p>
                        <div v-else>
                            <em>{{ __('Your database has been migrated!') }}</em>
                        </div>
                        <progress-button
                            v-if="!installation.has_ran_migrations"
                            class="btn btn-default mt-3"
                            :processing="runningMigrations"
                            @click.native="runMigrations">
                            {{ __('Run Migrations') }}
                        </progress-button>
                        <progress-button
                            v-else
                            class="btn btn-default mt-3"
                            :processing="rollingbackMigrations"
                            @click.native="rollbackMigrations">
                            {{ __('Rollback Migrations') }}
                        </progress-button>
                    </div>
                </div>

                <div class="flex items-start p-3">
                    <install-checklist-icon :valid="!!(installation.public_key_exists && installation.private_key_exists)" />
                    <div>
                        <h3 class="font-normal mb-2">
                            {{ __('Create public and private keys') }}
                        </h3>
                        <div v-if="!!(installation.public_key_exists && installation.private_key_exists)">
                            <code class="bg-80 text-white block mb-1">{{ installation.public_key_path }}</code>
                            <code class="bg-80 text-white block">{{ installation.private_key_path }}</code>
                        </div>
                        <progress-button
                            v-if="!(installation.public_key_exists && installation.private_key_exists)"
                            class="btn btn-default mt-3"
                            :processing="creatingKeys"
                            @click.native="createKeys">
                            {{ __('Create Keys') }}
                        </progress-button>
                        <progress-button
                            v-else
                            class="btn btn-default mt-3"
                            :processing="deletingKeys"
                            @click.native="deleteKeys">
                            {{ __('Delete Keys') }}
                        </progress-button>
                    </div>
                </div>

                <div class="flex items-start p-3">
                    <install-checklist-icon :valid="!!installation.password_client" />
                    <div>
                        <h3 class="font-normal mb-2">
                            {{ __('Create password client') }}
                        </h3>
                        <div v-if="installation.password_client">
                            {{ installation.password_client.name }}
                        </div>
                        <progress-button
                            v-if="!installation.password_client"
                            class="btn btn-default mt-3"
                            :disabled="!installation.has_ran_migrations"
                            :processing="creatingPasswordClient"
                            @click.native="createPasswordClient">
                            {{ __('Create Password Client') }}
                        </progress-button>
                        <progress-button
                            v-else
                            class="btn btn-default mt-3"
                            :processing="deletingPasswordClient"
                            @click.native="deletePasswordClient">
                            {{ __('Delete Password Client') }}
                        </progress-button>
                    </div>
                </div>

                <div class="flex items-start p-3">
                    <install-checklist-icon :valid="!!installation.personal_access_client" />
                    <div>
                        <h3 class="font-normal mb-2">
                            {{ __('Create personal access client') }}
                        </h3>
                        <div v-if="installation.personal_access_client">
                            {{ installation.personal_access_client.name }}
                        </div>
                        <progress-button
                            v-if="!installation.personal_access_client"
                            class="btn btn-default mt-3"
                            :disabled="!installation.has_ran_migrations"
                            :processing="creatingPersonalAccessClient"
                            @click.native="createPersonalAccessClient">
                            {{ __('Create Personal Access Client') }}
                        </progress-button>
                        <progress-button
                            v-else
                            class="btn btn-default mt-3"
                            :processing="deletingPersonalAccessClient"
                            @click.native="deletePersonalAccessClient">
                            {{ __('Delete Personal Access Client') }}
                        </progress-button>
                    </div>
                </div>
            </card>

            <card class="p-4 mt-3">
                <h1 class="mb-3">{{ __('Optional') }}</h1>

                <div class="flex items-start p-3">
                    <install-checklist-icon :valid="installation.has_published_migrations" />
                    <div>
                        <h3 class="font-normal mb-2">
                            {{ __('Publish Migrations') }}
                        </h3>
                        <p v-if="!installation.has_published_migrations" class="mb-2">{{ __('This will publish the Passport database migrations.') }}</p>
                        <p v-else class="mb-2">{{ __('The Passport database migrations have been published.') }}</p>
                        <progress-button
                            v-if="!installation.has_published_migrations"
                            class="btn btn-default mt-3"
                            :processing="publishingMigrations"
                            @click.native="publishMigrations">
                            {{ __('Publish Migrations') }}
                        </progress-button>
                        <progress-button
                            v-else-if="!installation.has_ran_migrations"
                            class="btn btn-default mt-3"
                            :processing="unpublishingMigrations"
                            @click.native="unpublishMigrations">
                            {{ __('Delete Migrations') }}
                        </progress-button>
                    </div>
                </div>
                
                <!--
                <div class="flex items-start p-3">
                    <install-checklist-icon :valid="!!(installation.client_uuids && installation.has_ran_client_uuid_migrations)" />
                    <div>
                        <h3 class="font-normal mb-2">
                            {{ __('Install Client Uuids') }}
                        </h3>
                        <p class="mb-2">{{ __('Run the required migrations required to convert the incremental id\'s to uuids. Caution, this will delete all existing clients. This feature is best installed before Passport is used for the first time.') }}</p>
                        <p class="mb-2"><em>{{ __('This action can only be undone by rolling back, deleting, and re-publishing the Passport migrations.') }}</em></p>
                        <progress-button
                            v-if="!installation.has_ran_client_uuid_migrations"
                            class="btn btn-default mt-3"
                            :disabled="!installation.has_ran_migrations"
                            :processing="installingClientUuidMigration"
                            @click.native="installClientUuidMigration">
                            {{ __('Install Client Uuids') }}
                        </progress-button>
                    </div>
                </div>
                -->
            </card>

            <card v-if="installation.has_published_migrations || installation.private_key_exists || installation.public_key_exists" class="p-3 mt-3">
                <div>
                    <h1 class="mb-3">
                        {{ __('Uninstall') }}
                    </h1>
                    <p class="mb-2">{{ __('Completely remove all Passport data, rollback and remove the migrations and remove the config file.') }}</p>
                    <p class="mb-2"><em>{{ __('Note, you will still need to run the following command to completel uninstall Passport:') }}</em></p>
                    <div><code class="bg-80 text-white">composer remove laravel/passport</code></div>
                    <progress-button
                        class="btn-danger mt-3"
                        :processing="uninstallingPassport"
                        @click.native="uninstallPassport">
                        {{ __('Uninstall Passport') }}
                    </progress-button>
                </div>
            </card>
        </template>
    </loading-view>
</template>

<script>
import InstallChecklistIcon from './InstallChecklistIcon';

export default {
    components: {
        InstallChecklistIcon
    },
    mounted() {
        this.checkInstallation();
    },
    methods: {
        checkInstallation() {
            this.loading = true;

            return Nova.request()
                .get('/nova-vendor/passporter/installation')
                .then(({ data }) => {
                    this.installation = data;

                    return data;
                })
                .finally(() => this.loading = false);
        },
        createKeys() {
            this.creatingKeys = true;

            return Nova.request()
                .post('/nova-vendor/passporter/installation/keys')
                .then(({ data }) => this.installation = data)
                .finally(() => {
                    this.creatingKeys = false

                    Nova.success(this.__('Passport keys created!'));
                });
        },
        deleteKeys() {
            if(!confirm(this.__('Are you sure you want to delete the encryption keys? Passport will not function without encryption keys.'))) {
                return;
            }

            this.deletingKeys = true;

            return Nova.request()
                .delete('/nova-vendor/passporter/installation/keys')
                .then(({ data }) => this.installation = data)
                .finally(() => {
                    this.deletingKeys = false

                    Nova.success(this.__('Passport keys deleted!'));
                });
        },
        deletePersonalAccessClient() {
            if(!confirm(this.__('Are you sure you want to delete the Password Client?'))) {
                return;
            }

            this.deletingPersonalAccessClient = true;

            return Nova.request()
                .delete('/nova-vendor/passporter/installation/personal-access-client')
                .then(({ data }) => this.installation = data)
                .finally(() => {
                    this.deletingPersonalAccessClient = false

                    Nova.success(this.__('Personal Access Client deleted!'));
                });
        },
        createPasswordClient() {
            this.creatingPasswordClient = true;

            return Nova.request()
                .post('/nova-vendor/passporter/installation/password-client')
                .then(({ data }) => this.installation = data)
                .finally(() => {
                    this.creatingPasswordClient = false

                    Nova.success(this.__('Password client created!'));
                });
        },
        deletePasswordClient() {
            if(!confirm(this.__('Are you sure you want to delete the Password Client?'))) {
                return;
            }

            this.deletingPasswordClient = true;

            return Nova.request()
                .delete('/nova-vendor/passporter/installation/password-client')
                .then(({ data }) => this.installation = data)
                .finally(() => {
                    this.deletingPasswordClient = false

                    Nova.success(this.__('Password Client deleted!'));
                });
        },
        createPersonalAccessClient() {
            this.creatingPersonalAccessClient = true;

            return Nova.request()
                .post('/nova-vendor/passporter/installation/personal-access-client')
                .then(({ data }) => this.installation = data)
                .finally(() => {
                    this.creatingPersonalAccessClient = false

                    Nova.success(this.__('Personal access client created!'));
                });
        },
        installClientUuidMigration() {
            this.installingClientUuidMigration = true;

            return Nova.request()
                .post('/nova-vendor/passporter/installation/client-uuids')
                .then(({ data }) => this.installation = data)
                .finally(() => {
                    this.installingClientUuidMigration = false

                    Nova.success(this.__('Client uuids migrated!'));
                });
        },
        publishMigrations() {
            this.publishingMigrations = true;

            return Nova.request()
                .post('/nova-vendor/passporter/installation/migrations')
                .then(({ data }) => this.installation = data)
                .finally(() => {
                    this.publishingMigrations = false

                    Nova.success(this.__('Database migrations published!'));
                });
        },
        unpublishMigrations() {
            this.unpublishingMigrations = true;

            return Nova.request()
                .delete('/nova-vendor/passporter/installation/migrations')
                .then(({ data }) => this.installation = data)
                .finally(() => {
                    this.unpublishingMigrations = false

                    Nova.success(this.__('Database migrations deleted!'));
                });
        },
        publishConfig() {
            this.publishingConfig = true;

            return Nova.request()
                .post('/nova-vendor/passporter/installation/config')
                .then(({ data }) => this.installation = data)
                .finally(() => {
                    this.publishingConfig = false

                    Nova.success(this.__('Passport config published!'));
                });
        },
        unpublishConfig() {
            this.unpublishingConfig = true;

            return Nova.request()
                .delete('/nova-vendor/passporter/installation/config')
                .then(({ data }) => this.installation = data)
                .finally(() => {
                    this.unpublishingConfig = false

                    Nova.success(this.__('Passport config deleted!'));
                });
        },
        rollbackMigrations() {
            if(!confirm(this.__('Are you sure you want to rollback the Passport migrations? This will permenantly deleted all the Passport data from the database.'))) {
                return;
            }

            this.rollingbackMigrations = true;

            return Nova.request()
                .delete('/nova-vendor/passporter/installation/migrate')
                .then(({ data }) => this.installation = data)
                .finally(() => {
                    this.rollingbackMigrations = false

                    Nova.success(this.__('Database migrations rolledback!'));
                });
        },
        runMigrations() {
            this.runningMigrations = true;

            return Nova.request()
                .post('/nova-vendor/passporter/installation/migrate')
                .then(({ data }) => this.installation = data)
                .finally(() => {
                    this.runningMigrations = false

                    Nova.success(this.__('Database migrations ran!'));
                });
        },
        uninstallPassport() {
            this.uninstallingPassport = true;

            return Nova.request()
                .delete('/nova-vendor/passporter/installation')
                .then(({ data }) => this.installation = data)
                .finally(() => {
                    this.uninstallingPassport = false

                    Nova.success(this.__('Passport uninstalled!'));
                });
        }
    },
    data: () => ({
        deletingKeys: false,
        deletingPasswordClient: false,
        deletingPersonalAccessClient: false,
        creatingKeys: false,
        creatingPasswordClient: false,
        creatingPersonalAccessClient: false,
        installingClientUuidMigration: false,
        installation: null,
        loading: true,
        publishingConfig: false,
        publishingMigrations: false,
        rollingbackMigrations: false,
        runningMigrations: false,
        uninstallingPassport: false,
        unpublishingConfig: false,
        unpublishingMigrations: false
    }),
}
</script>

<style>
/* Scoped Styles */
</style>

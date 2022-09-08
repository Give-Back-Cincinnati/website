import { apiSlice as api } from "./apiSlice";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    searchFilters: build.query<SearchFiltersApiResponse, SearchFiltersApiArg>({
      query: (queryArg) => ({
        url: `/filters`,
        params: {
          limit: queryArg.limit,
          offset: queryArg.offset,
          sort: queryArg.sort,
          order: queryArg.order,
        },
      }),
    }),
    createFilters: build.mutation<
      CreateFiltersApiResponse,
      CreateFiltersApiArg
    >({
      query: (queryArg) => ({
        url: `/filters`,
        method: "POST",
        body: queryArg.filters,
      }),
    }),
    getFilters: build.query<GetFiltersApiResponse, GetFiltersApiArg>({
      query: (queryArg) => ({ url: `/filters/${queryArg.id}` }),
    }),
    updateFilters: build.mutation<
      UpdateFiltersApiResponse,
      UpdateFiltersApiArg
    >({
      query: (queryArg) => ({
        url: `/filters/${queryArg.id}`,
        method: "PATCH",
      }),
    }),
    deleteFilters: build.mutation<
      DeleteFiltersApiResponse,
      DeleteFiltersApiArg
    >({
      query: (queryArg) => ({
        url: `/filters/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    ping: build.query<PingApiResponse, PingApiArg>({
      query: () => ({ url: `/ping` }),
    }),
    searchPermissions: build.query<
      SearchPermissionsApiResponse,
      SearchPermissionsApiArg
    >({
      query: (queryArg) => ({
        url: `/permissions`,
        params: {
          limit: queryArg.limit,
          offset: queryArg.offset,
          sort: queryArg.sort,
          order: queryArg.order,
        },
      }),
    }),
    createPermission: build.mutation<
      CreatePermissionApiResponse,
      CreatePermissionApiArg
    >({
      query: (queryArg) => ({
        url: `/permissions`,
        method: "POST",
        body: queryArg.permissions,
      }),
    }),
    getPermission: build.query<GetPermissionApiResponse, GetPermissionApiArg>({
      query: (queryArg) => ({ url: `/permissions/${queryArg.id}` }),
    }),
    updatePermission: build.mutation<
      UpdatePermissionApiResponse,
      UpdatePermissionApiArg
    >({
      query: (queryArg) => ({
        url: `/permissions/${queryArg.id}`,
        method: "PATCH",
      }),
    }),
    deletePermission: build.mutation<
      DeletePermissionApiResponse,
      DeletePermissionApiArg
    >({
      query: (queryArg) => ({
        url: `/permissions/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    searchRoles: build.query<SearchRolesApiResponse, SearchRolesApiArg>({
      query: (queryArg) => ({
        url: `/roles`,
        params: {
          limit: queryArg.limit,
          offset: queryArg.offset,
          sort: queryArg.sort,
          order: queryArg.order,
        },
      }),
    }),
    createRole: build.mutation<CreateRoleApiResponse, CreateRoleApiArg>({
      query: (queryArg) => ({
        url: `/roles`,
        method: "POST",
        body: queryArg.roles,
      }),
    }),
    getRole: build.query<GetRoleApiResponse, GetRoleApiArg>({
      query: (queryArg) => ({ url: `/roles/${queryArg.id}` }),
    }),
    updateRole: build.mutation<UpdateRoleApiResponse, UpdateRoleApiArg>({
      query: (queryArg) => ({ url: `/roles/${queryArg.id}`, method: "PATCH" }),
    }),
    deleteRole: build.mutation<DeleteRoleApiResponse, DeleteRoleApiArg>({
      query: (queryArg) => ({ url: `/roles/${queryArg.id}`, method: "DELETE" }),
    }),
    searchUsers: build.query<SearchUsersApiResponse, SearchUsersApiArg>({
      query: (queryArg) => ({
        url: `/users`,
        params: {
          limit: queryArg.limit,
          offset: queryArg.offset,
          sort: queryArg.sort,
          order: queryArg.order,
        },
      }),
    }),
    createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
      query: (queryArg) => ({
        url: `/users`,
        method: "POST",
        body: queryArg.users,
      }),
    }),
    getMe: build.query<GetMeApiResponse, GetMeApiArg>({
      query: () => ({ url: `/users/me` }),
    }),
    getUser: build.query<GetUserApiResponse, GetUserApiArg>({
      query: (queryArg) => ({ url: `/users/${queryArg.id}` }),
    }),
    updateUser: build.mutation<UpdateUserApiResponse, UpdateUserApiArg>({
      query: (queryArg) => ({
        url: `/users/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
      query: (queryArg) => ({ url: `/users/${queryArg.id}`, method: "DELETE" }),
    }),
    login: build.mutation<LoginApiResponse, LoginApiArg>({
      query: (queryArg) => ({
        url: `/auth/login`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    authGoogleCallback: build.query<
      AuthGoogleCallbackApiResponse,
      AuthGoogleCallbackApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/google/callback`,
        params: {
          code: queryArg.code,
          scope: queryArg.scope,
          authuser: queryArg.authuser,
          hd: queryArg.hd,
          prompt: queryArg.prompt,
        },
      }),
    }),
    searchEvents: build.query<SearchEventsApiResponse, SearchEventsApiArg>({
      query: (queryArg) => ({
        url: `/events`,
        params: {
          limit: queryArg.limit,
          offset: queryArg.offset,
          sort: queryArg.sort,
          order: queryArg.order,
          name: queryArg.name,
          category: queryArg.category,
          startTime: queryArg.startTime,
          endTime: queryArg.endTime,
        },
      }),
    }),
    createEvents: build.mutation<CreateEventsApiResponse, CreateEventsApiArg>({
      query: (queryArg) => ({
        url: `/events`,
        method: "POST",
        body: queryArg.events,
      }),
    }),
    getEvents: build.query<GetEventsApiResponse, GetEventsApiArg>({
      query: (queryArg) => ({ url: `/events/${queryArg.id}` }),
    }),
    updateEvents: build.mutation<UpdateEventsApiResponse, UpdateEventsApiArg>({
      query: (queryArg) => ({
        url: `/events/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.events,
      }),
    }),
    deleteEvents: build.mutation<DeleteEventsApiResponse, DeleteEventsApiArg>({
      query: (queryArg) => ({
        url: `/events/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getEventsByEventIdRegister: build.query<
      GetEventsByEventIdRegisterApiResponse,
      GetEventsByEventIdRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/events/${queryArg.eventId}/register`,
        params: {
          limit: queryArg.limit,
          offset: queryArg.offset,
          sort: queryArg.sort,
          order: queryArg.order,
        },
      }),
    }),
    postEventsByEventIdRegister: build.mutation<
      PostEventsByEventIdRegisterApiResponse,
      PostEventsByEventIdRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/events/${queryArg.eventId}/register`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    updateRegistration: build.mutation<
      UpdateRegistrationApiResponse,
      UpdateRegistrationApiArg
    >({
      query: (queryArg) => ({
        url: `/events/${queryArg.eventId}/register/${queryArg.registrationId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    deleteRegistration: build.mutation<
      DeleteRegistrationApiResponse,
      DeleteRegistrationApiArg
    >({
      query: (queryArg) => ({
        url: `/events/${queryArg.eventId}/register/${queryArg.registrationId}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as openApi };
export type SearchFiltersApiResponse = /** status 200 undefined */ Filters[];
export type SearchFiltersApiArg = {
  limit?: number;
  offset?: number;
  sort?: "name";
  order?: "asc" | "desc";
};
export type CreateFiltersApiResponse = /** status 201 undefined */ Filters;
export type CreateFiltersApiArg = {
  filters: Filters;
};
export type GetFiltersApiResponse = /** status 200 Success */ Filters;
export type GetFiltersApiArg = {
  id?: any;
};
export type UpdateFiltersApiResponse = /** status 200 Success */ Filters;
export type UpdateFiltersApiArg = {
  id?: any;
};
export type DeleteFiltersApiResponse = unknown;
export type DeleteFiltersApiArg = {
  id?: any;
};
export type PingApiResponse = unknown;
export type PingApiArg = void;
export type SearchPermissionsApiResponse =
  /** status 200 undefined */ Permissions[];
export type SearchPermissionsApiArg = {
  limit?: number;
  offset?: number;
  sort?: "name" | "group";
  order?: "asc" | "desc";
};
export type CreatePermissionApiResponse =
  /** status 201 undefined */ Permissions;
export type CreatePermissionApiArg = {
  permissions: Permissions;
};
export type GetPermissionApiResponse = /** status 200 Success */ Permissions;
export type GetPermissionApiArg = {
  id?: any;
};
export type UpdatePermissionApiResponse = /** status 200 Success */ Permissions;
export type UpdatePermissionApiArg = {
  id?: any;
};
export type DeletePermissionApiResponse = unknown;
export type DeletePermissionApiArg = {
  id?: any;
};
export type SearchRolesApiResponse = /** status 200 undefined */ Roles[];
export type SearchRolesApiArg = {
  limit?: number;
  offset?: number;
  sort?: "name";
  order?: "asc" | "desc";
};
export type CreateRoleApiResponse = /** status 201 undefined */ Roles;
export type CreateRoleApiArg = {
  roles: Roles;
};
export type GetRoleApiResponse = /** status 200 Success */ Roles;
export type GetRoleApiArg = {
  id?: any;
};
export type UpdateRoleApiResponse = /** status 200 Success */ Roles;
export type UpdateRoleApiArg = {
  id?: any;
};
export type DeleteRoleApiResponse = unknown;
export type DeleteRoleApiArg = {
  id?: any;
};
export type SearchUsersApiResponse = /** status 200 undefined */ Users[];
export type SearchUsersApiArg = {
  limit?: number;
  offset?: number;
  sort?: "firstName" | "lastName" | "email" | "role";
  order?: "asc" | "desc";
};
export type CreateUserApiResponse = /** status 201 undefined */ Users;
export type CreateUserApiArg = {
  users: Users;
};
export type GetMeApiResponse = /** status 200 Me */ UsersMe;
export type GetMeApiArg = void;
export type GetUserApiResponse = /** status 200 Success */ Users;
export type GetUserApiArg = {
  id?: any;
};
export type UpdateUserApiResponse = /** status 200 Success */ Users;
export type UpdateUserApiArg = {
  id?: any;
  body: Users & {
    profilePicture?: any | null;
    role?: any | null;
  };
};
export type DeleteUserApiResponse = unknown;
export type DeleteUserApiArg = {
  id?: any;
};
export type LoginApiResponse = unknown;
export type LoginApiArg = {
  body: {
    email: string;
    password: string;
  };
};
export type AuthGoogleCallbackApiResponse = unknown;
export type AuthGoogleCallbackApiArg = {
  /** Google issued authentication token */
  code: string;
  /** Google scopes desired */
  scope: string;
  /** Google auth-user array position */
  authuser: string;
  /** user email domain */
  hd: string;
  /** whether to prompt the user */
  prompt: string;
};
export type SearchEventsApiResponse = /** status 200 undefined */ Events[];
export type SearchEventsApiArg = {
  limit?: number;
  offset?: number;
  sort?: "name" | "category" | "startTime" | "endTime";
  order?: "asc" | "desc";
  name?: any;
  category?: EventCategories;
  startTime?: string;
  endTime?: string;
};
export type CreateEventsApiResponse = /** status 201 undefined */ Events;
export type CreateEventsApiArg = {
  events: Events;
};
export type GetEventsApiResponse = /** status 200 Success */ Events;
export type GetEventsApiArg = {
  id?: any;
};
export type UpdateEventsApiResponse = /** status 200 Success */ Events;
export type UpdateEventsApiArg = {
  id?: any;
  events: Events;
};
export type DeleteEventsApiResponse = unknown;
export type DeleteEventsApiArg = {
  id?: any;
};
export type GetEventsByEventIdRegisterApiResponse =
  /** status 200 undefined */ (UserRegistration | GuestRegistration)[];
export type GetEventsByEventIdRegisterApiArg = {
  eventId?: any;
  limit?: number;
  offset?: number;
  sort?: "name" | "category" | "startTime" | "endTime";
  order?: "asc" | "desc";
};
export type PostEventsByEventIdRegisterApiResponse = unknown;
export type PostEventsByEventIdRegisterApiArg = {
  eventId?: any;
  body: UserRegistration | GuestRegistration;
};
export type UpdateRegistrationApiResponse = /** status 200 Success */
  | UserRegistration
  | GuestRegistration;
export type UpdateRegistrationApiArg = {
  eventId?: any;
  registrationId?: any;
  body: UserRegistration | GuestRegistration;
};
export type DeleteRegistrationApiResponse = unknown;
export type DeleteRegistrationApiArg = {
  eventId?: any;
  registrationId?: any;
};
export type Filters = {
  _id?: string;
  name: string;
};
export type Permissions = {
  _id?: string;
  name: string;
  group: string;
};
export type Roles = {
  _id?: string;
  name: string;
  permissions: string[];
  filters?: string[];
};
export type Users = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
  role: string;
};
export type RolesMe = {
  _id?: string;
  name: string;
  permissions: Permissions[];
  filters?: Filters[];
};
export type UsersMe = Users & {
  role?: RolesMe;
};
export type Events = {
  _id?: string;
  name: string;
  description: string;
  category: any;
  address: string;
  startTime: string;
  endTime: string;
};
export type EventCategories =
  | "Hands-On"
  | "Social"
  | "Interactive"
  | "Civic Engagement"
  | "New Member"
  | "Cincy YP"
  | "Leadership"
  | "Fall Feast"
  | "Paint the Town"
  | "Give Back Beyond Cincinnati";
export type BasicRegistration = {
  _id?: string;
  phone: string;
  dateOfBirth: string;
  hasAgreedToTerms: boolean;
  checkedIn?: boolean;
};
export type UserRegistration = BasicRegistration & {
  user?: Users | string;
};
export type GuestRegistration = {
  firstName: string;
  lastName: string;
  email: string;
} & BasicRegistration;
export const {
  useSearchFiltersQuery,
  useLazySearchFiltersQuery,
  useCreateFiltersMutation,
  useGetFiltersQuery,
  useLazyGetFiltersQuery,
  useUpdateFiltersMutation,
  useDeleteFiltersMutation,
  usePingQuery,
  useLazyPingQuery,
  useSearchPermissionsQuery,
  useLazySearchPermissionsQuery,
  useCreatePermissionMutation,
  useGetPermissionQuery,
  useLazyGetPermissionQuery,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
  useSearchRolesQuery,
  useLazySearchRolesQuery,
  useCreateRoleMutation,
  useGetRoleQuery,
  useLazyGetRoleQuery,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useSearchUsersQuery,
  useLazySearchUsersQuery,
  useCreateUserMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLoginMutation,
  useAuthGoogleCallbackQuery,
  useLazyAuthGoogleCallbackQuery,
  useSearchEventsQuery,
  useLazySearchEventsQuery,
  useCreateEventsMutation,
  useGetEventsQuery,
  useLazyGetEventsQuery,
  useUpdateEventsMutation,
  useDeleteEventsMutation,
  useGetEventsByEventIdRegisterQuery,
  useLazyGetEventsByEventIdRegisterQuery,
  usePostEventsByEventIdRegisterMutation,
  useUpdateRegistrationMutation,
  useDeleteRegistrationMutation,
} = injectedRtkApi;

import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'
import { UserDto } from '../http/dto/user/user.dto'
import { UpdateProfileDto } from '../http/dto/user/update-profile.dto'
import { UpdateSetupCompleteDto } from '../http/dto/user/update-setup-complete.dto'
import { UpdateImageUrlDto } from '../http/dto/user/update-image-url.dto'
import { UpdateEmailDto } from '../http/dto/user/update-email.dto'
import { UpdateEmailNotificationsDto } from '../http/dto/user/update-email-notifications.dto'
import { UpdateGoogleEmailDto } from '../http/dto/user/update-google-email.dto'
import {MenuDto} from "../http/dto/menu-dto/menu/menu.dto";
import {UpdateMenuDto} from "../http/dto/menu-dto/menu/update-menu-dto";

export interface AppState {
    user: UserDto
    loggedIn: boolean | null
}

const initialMenuData: MenuDto = {
  id: -1,
  name: '',
  url: '',
  userId: -1,
  imageUrl: null,
  createdAt: new Date(),
}

const initialUserData: UserDto = {
    email: '',
    id: -1,
    firebaseId: '',
    googleEmail: null,
    username: '',
    role: '',
    createdAt: new Date(),
    imageUrl: null,
    emailNotifications: true,
    firstName: '',
    lastName: '',
    setupComplete: false,
  menu: initialMenuData,
}



const initialState: AppState = {
    user: initialUserData,
    loggedIn: null,
}

export const AppStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        setUser(userDto: UserDto) {
            patchState(store, () => ({
                user: userDto,
                loggedIn: store.loggedIn(),
            }))
        },
        updateMenu(updateMenuDto: UpdateMenuDto) {
          patchState(store, (state) => ({
            user: { ...state.user,
              menu: { ...state.user.menu, ...updateMenuDto },

            },
          }))
        },
        updateImageUrl(updateImageUrlDto: UpdateImageUrlDto) {
            patchState(store, (state) => ({
                user: { ...state.user, ...updateImageUrlDto },
            }))
        },
        updateGoogleEmail(updateGoogleEmailDto: UpdateGoogleEmailDto) {
            patchState(store, (state) => ({
                user: { ...state.user, ...updateGoogleEmailDto },
            }))
        },
        updateEmailNotifications(updateEmailNotificationsDto: UpdateEmailNotificationsDto) {
            patchState(store, (state) => ({
                user: { ...state.user, ...updateEmailNotificationsDto },
            }))
        },
        updateEmail(updateEmailDto: UpdateEmailDto) {
            patchState(store, (state) => ({
                user: { ...state.user, ...updateEmailDto },
            }))
        },
        updateProfile(updateProfileDto: UpdateProfileDto) {
            patchState(store, (state) => ({
                user: { ...state.user, ...updateProfileDto },
            }))
        },
        updateSetupComplete(updateSetupCompleteDto: UpdateSetupCompleteDto) {
            patchState(store, (state) => ({
                user: { ...state.user, ...updateSetupCompleteDto },
            }))
        },

        logIn(userDto: UserDto) {
            patchState(store, () => ({
                user: userDto,
                loggedIn: true,
            }))
        },
        logOut() {
            patchState(store, () => ({
                user: initialUserData,
              menu: initialMenuData,
                loggedIn: false,
            }))
        },
    })),
)

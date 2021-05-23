import React, { createContext, useEffect, useState } from "react";
import { AppState, Platform } from "react-native";
import { check, PERMISSIONS, PermissionStatus, request, openSettings } from "react-native-permissions";

export interface PermissionState {
  locationStatus: PermissionStatus;
}

export const permissionInitState: PermissionState = {
  locationStatus: 'unavailable',
}

type PermissionsContextProps = {
  permissions: PermissionState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
}

export const PermissionsContext = createContext({} as PermissionsContextProps);



export const PermissionsProvider = ({ children }: any) => {   // FUNCTIONAL COMPONENT PRINCIPAL QUE SE LLAMARÁ EN EL APP.TSX, ESTE FC CONTIENE TODAS LAS FUNCIONES DE LOS PERMISOS Y RETORNA EN EL CONTEXTO EL ESTADO DEL PERMISO Y SUS MÉTODOS

  const [permissions, setPermissions] = useState(permissionInitState);

  useEffect(() => {

    AppState.addEventListener('change', state => {

      console.log(state);
      if (state !== 'active') return;   // Si el estado de la app no es activo, o sea, minimizado o cerrado, salir de la función

      checkLocationPermission();    // Si es activo, ejecutar la revisión del permiso o los permisos

    });

  }, []);


  const askLocationPermission = async () => {

    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      /* permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE); */
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      /* permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION); */
      permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);   // SOLICITA PERMISOS DE UBICACIÓN
    }

    /* console.log(permissionStatus); */
    if (permissionStatus === 'blocked') {
      openSettings();
    }


    setPermissions({
      ...permissions,
      locationStatus: permissionStatus
    });

  }

  const checkLocationPermission = async () => {

    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {

      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    } else {

      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);   // SOLICITA PERMISOS DE UBICACIÓN

    }

    setPermissions({
      ...permissions,
      locationStatus: permissionStatus
    });

  }


  return (
    <PermissionsContext.Provider value={{
      permissions,
      askLocationPermission,
      checkLocationPermission,
    }}>
      {children}
    </PermissionsContext.Provider>
  )
}
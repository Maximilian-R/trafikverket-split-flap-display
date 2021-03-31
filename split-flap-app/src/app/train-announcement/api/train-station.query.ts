export const TRAIN_STATION_QUERY = (locationSignatures: string[]) => {
	return `
    <QUERY objecttype="TrainStation" schemaversion="1">
        <FILTER>
            <IN name="LocationSignature" value="${locationSignatures.join(',')}" />
        </FILTER>
        <INCLUDE>LocationSignature</INCLUDE>
        <INCLUDE>AdvertisedLocationName</INCLUDE>
        <INCLUDE>AdvertisedShortLocationName</INCLUDE>
        <INCLUDE>CountryCode</INCLUDE>
        <INCLUDE>PlatformLine</INCLUDE>
    </QUERY>`;
};

export const TRAIN_STATION_SEARCH_QUERY = (search: string = '', limit: number = 0) => {
	return `
    <QUERY objecttype="TrainStation" schemaversion="1" orderby="AdvertisedLocationName" limit="${limit}">
        <FILTER>
            <AND>
                <EQ name="Advertised" value="true" />
                <EQ name="CountryCode" value="SE" />
                <LIKE name="AdvertisedLocationName" value="/${search}/" />
            </AND>
        </FILTER>
        <INCLUDE>LocationSignature</INCLUDE>
        <INCLUDE>AdvertisedLocationName</INCLUDE>
        <INCLUDE>AdvertisedShortLocationName</INCLUDE>
        <INCLUDE>CountryCode</INCLUDE>
    </QUERY>`;
};

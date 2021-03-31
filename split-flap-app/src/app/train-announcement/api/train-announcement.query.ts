export const TRAIN_ANNOUNCEMENT_QUERY = (locationSignatures: string[]) => {
	return `
<QUERY objecttype="TrainAnnouncement" schemaversion="1.6" orderby="AdvertisedTimeAtLocation" limit="10">
    <FILTER>
        <AND>
            <EQ name="ActivityType" value="Avgang" />
            <IN name="LocationSignature" value="${locationSignatures.join(',')}" />
            <EQ name="Advertised" value="true" />
            <OR>
                <AND>
                    <GT name="AdvertisedTimeAtLocation" value="$dateadd(-00:05:00)" />
                    <LT name="AdvertisedTimeAtLocation" value="$dateadd(08:00:00)" />
                </AND>
                <AND>
                    <GT name="EstimatedTimeAtLocation" value="$dateadd(-00:05:00)" />
                    <LT name="EstimatedTimeAtLocation" value="$dateadd(08:00:00)" />
                </AND>
            </OR>
            <OR>
                <EXISTS name="TimeAtLocation" value="false" />
                <GT name="TimeAtLocationWithSeconds" value="$dateadd(-00:01:30)" />
            </OR>
        </AND>
    </FILTER>
    <INCLUDE>Advertised</INCLUDE>
    <INCLUDE>AdvertisedTimeAtLocation</INCLUDE>
    <INCLUDE>AdvertisedTrainIdent</INCLUDE>
    <INCLUDE>Booking</INCLUDE>
    <INCLUDE>Canceled</INCLUDE>
    <INCLUDE>Deleted</INCLUDE>
    <INCLUDE>Deviation</INCLUDE>
    <INCLUDE>EstimatedTimeAtLocation</INCLUDE>
    <INCLUDE>EstimatedTimeIsPreliminary</INCLUDE>
    <INCLUDE>Operator</INCLUDE>
    <INCLUDE>LocationSignature</INCLUDE>
    <INCLUDE>OtherInformation</INCLUDE>
    <INCLUDE>PlannedEstimatedTimeAtLocation</INCLUDE>
    <INCLUDE>PlannedEstimatedTimeAtLocationIsValid</INCLUDE>
    <INCLUDE>ProductInformation</INCLUDE>
    <INCLUDE>ScheduledDepartureDateTime</INCLUDE>
    <INCLUDE>Service</INCLUDE>
    <INCLUDE>TimeAtLocation</INCLUDE>
    <INCLUDE>ToLocation</INCLUDE>
    <INCLUDE>ViaToLocation</INCLUDE>
    <INCLUDE>TrackAtLocation</INCLUDE>
    <INCLUDE>TrainComposition</INCLUDE>
</QUERY>
`;
};

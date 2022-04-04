import { TelerikReportViewer } from '@progress/telerik-react-report-viewer'
import { useEffect } from 'react';

export const Telerik = () => {
    let viewer: any;

    /* useEffect(() => {
        const reportdata = JSON.stringify({});
        const rs = {
            report: 'ManifiestoMovilizacion.trdx',
            parameters: { DataParameter: reportdata }
        };
        viewer.setReportSource(rs);
    }, []); */

    return (
        <>
            AQUI REPORTE
            <TelerikReportViewer
                ref={el => viewer = el}
                serviceUrl="https://emoback.idslatam.com/report/api/reports"
                reportSource={{
                    report: 'ManifiestoMovilizacion.trdx',
                    parameters: {}
                }}
                viewerContainerStyle={{
                    position: 'fixed',
                    left: '5px',
                    right: '5px',
                    top: '40px',
                    bottom: '5px',
                    overflow: 'hidden',
                    clear: 'both',
                    fontFamily: 'ms sans serif'
                }}
                viewMode="INTERACTIVE"
                scaleMode="SPECIFIC"
                scale={1.0}
                enableAccessibility={false} />
        </>
    )
}
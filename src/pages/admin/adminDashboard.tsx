import { Grid } from "@mui/material";
import AsignaturaOptions from "../../components/asignaturaOptions";
import LaboratorioOptions from "../../components/laboratorioOptions";




export const AdminDashboard = () => {
    return (
        <Grid container spacing={2} sx={{ padding: 2 }}>
            <AsignaturaOptions/>
            <LaboratorioOptions/>
        </Grid>
    )
}

export default AdminDashboard;
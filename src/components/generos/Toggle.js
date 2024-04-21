export default function Toggle({ cambiarEstado, estado }) {
  return (
    <div className="form-check form-switch">
        <input onClick={cambiarEstado} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={estado} />
        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Activos/Inactivos</label> {/* Corregir class a className */}
    </div>
  );
}
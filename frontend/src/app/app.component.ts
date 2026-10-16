import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Entity = 'productos' | 'vendedores' | 'ventas';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <header>
    <div><small>ADMINISTRACIÓN</small><h1>Sistema de ventas</h1></div>
    <span class="status" [class.bad]="!apiOk">{{ apiOk ? 'API conectada' : 'Verificando API' }}</span>
  </header>
  <main>
    <nav>
      <button *ngFor="let item of entities" [class.selected]="active===item.key" (click)="change(item.key)">
        {{ item.label }}
      </button>
    </nav>
    <section class="panel">
      <div class="heading">
        <div><h2>{{ currentLabel }}</h2><p>Gestiona los registros de {{ currentLabel.toLowerCase() }}.</p></div>
        <button class="primary" (click)="newItem()">+ Nuevo registro</button>
      </div>
      <p class="message" *ngIf="message">{{ message }}</p>
      <form *ngIf="editing" (ngSubmit)="save()">
        <div class="fields">
          <ng-container *ngFor="let field of fields">
            <label>{{ field.label }}
              <input *ngIf="field.type !== 'select' && field.type !== 'checkbox'" [type]="field.type || 'text'"
                [required]="field.required" [(ngModel)]="form[field.key]" [name]="field.key">
              <select *ngIf="field.type === 'select'" [(ngModel)]="form[field.key]" [name]="field.key" required>
                <option [ngValue]="null">Selecciona...</option>
                <option *ngFor="let option of options[field.key] || []" [ngValue]="option.id">{{ option.label }}</option>
              </select>
              <input *ngIf="field.type === 'checkbox'" type="checkbox" [(ngModel)]="form[field.key]" [name]="field.key">
            </label>
          </ng-container>
        </div>
        <div class="actions"><button class="primary" type="submit">Guardar</button><button type="button" (click)="editing=false">Cancelar</button></div>
      </form>
      <div class="table-wrap">
        <table *ngIf="rows.length; else empty">
          <thead><tr><th *ngFor="let col of columns">{{ col.label }}</th><th>Acciones</th></tr></thead>
          <tbody><tr *ngFor="let row of rows">
            <td *ngFor="let col of columns">{{ display(row, col.key) }}</td>
            <td class="row-actions"><button (click)="edit(row)">Editar</button><button class="danger" (click)="remove(row)">Eliminar</button></td>
          </tr></tbody>
        </table>
        <ng-template #empty><p class="empty">No hay registros para mostrar.</p></ng-template>
      </div>
    </section>
  </main>
  `
})
export class AppComponent implements OnInit {
  entities: {key: Entity; label: string}[] = [
    {key:'productos',label:'Productos'}, {key:'vendedores',label:'Vendedores'}, {key:'ventas',label:'Ventas'}
  ];
  active: Entity = 'productos';
  rows: any[] = [];
  editing = false;
  editId: number | null = null;
  form: any = {};
  message = '';
  apiOk = false;
  options: Record<string, any[]> = { id_producto: [], id_vendedor: [] };
  fields: any[] = [];
  columns: any[] = [];
  private base = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get<any>(`${this.base}/health`).subscribe({next:()=>this.apiOk=true, error:()=>this.apiOk=false});
    this.load();
  }
  get currentLabel() { return this.entities.find(x=>x.key===this.active)?.label || ''; }
  change(key: Entity) { this.active=key; this.editing=false; this.message=''; this.load(); }
  config() {
    if (this.active === 'productos') {
      this.fields = [
        {key:'nombre',label:'Nombre',required:true},{key:'descripcion',label:'Descripción'},
        {key:'precio',label:'Precio',type:'number',required:true},{key:'stock',label:'Stock',type:'number',required:true},
        {key:'activo',label:'Activo',type:'checkbox'}
      ];
      this.columns = [{key:'id_producto',label:'ID'},{key:'nombre',label:'Nombre'},{key:'precio',label:'Precio'},{key:'stock',label:'Stock'},{key:'activo',label:'Activo'}];
    } else if (this.active === 'vendedores') {
      this.fields = [
        {key:'nombre',label:'Nombre',required:true},{key:'apellido',label:'Apellido',required:true},
        {key:'correo',label:'Correo',type:'email',required:true},{key:'telefono',label:'Teléfono'},
        {key:'activo',label:'Activo',type:'checkbox'}
      ];
      this.columns = [{key:'id_vendedor',label:'ID'},{key:'nombre',label:'Nombre'},{key:'apellido',label:'Apellido'},{key:'correo',label:'Correo'},{key:'telefono',label:'Teléfono'},{key:'activo',label:'Activo'}];
    } else {
      this.fields = [
        {key:'id_producto',label:'Producto',type:'select',required:true},{key:'id_vendedor',label:'Vendedor',type:'select',required:true},
        {key:'cantidad',label:'Cantidad',type:'number',required:true},{key:'precio_unitario',label:'Precio unitario',type:'number',required:true},
        {key:'fecha_venta',label:'Fecha (opcional)',type:'datetime-local'}
      ];
      this.columns = [{key:'id_venta',label:'ID'},{key:'producto',label:'Producto'},{key:'vendedor',label:'Vendedor'},{key:'cantidad',label:'Cantidad'},{key:'precio_unitario',label:'Precio unitario'},{key:'total',label:'Total'},{key:'fecha_venta',label:'Fecha'}];
    }
  }
  load() {
    this.config();
    if (this.active === 'ventas') {
      this.http.get<any[]>(`${this.base}/productos`).subscribe({next:items=>this.options['id_producto']=items.map(x=>({id:x.id_producto,label:x.nombre})),error:()=>{}});
      this.http.get<any[]>(`${this.base}/vendedores`).subscribe({next:items=>this.options['id_vendedor']=items.map(x=>({id:x.id_vendedor,label:`${x.nombre} ${x.apellido}`})),error:()=>{}});
    }
    this.http.get<any[]>(`${this.base}/${this.active}`).subscribe({
      next:items=>{this.rows=items;this.apiOk=true;},
      error:err=>{this.rows=[];this.apiOk=false;this.message=err.error?.mensaje || 'No se pudo conectar con la API. Comprueba que el backend esté ejecutándose.';}
    });
  }
  newItem() { this.editId=null; this.form={activo:true,stock:0,cantidad:1}; this.editing=true; this.message=''; }
  edit(row:any) {
    this.editId=row[this.idKey()];
    this.form={...row};
    if (this.active==='ventas' && row.fecha_venta) this.form.fecha_venta=String(row.fecha_venta).slice(0,16);
    this.editing=true; this.message='';
  }
  save() {
    const payload={...this.form};
    if (this.active==='ventas' && !payload.fecha_venta) delete payload.fecha_venta;
    const url=`${this.base}/${this.active}`+(this.editId!==null?`/${this.editId}`:'');
    const request=this.editId!==null?this.http.put(url,payload):this.http.post(url,payload);
    request.subscribe({next:()=>{this.editing=false;this.message='Registro guardado correctamente.';this.load();},error:err=>this.message=err.error?.mensaje || 'No se pudo guardar el registro.'});
  }
  remove(row:any) {
    const id=row[this.idKey()];
    if (!confirm('¿Seguro que deseas eliminar este registro?')) return;
    this.http.delete(`${this.base}/${this.active}/${id}`).subscribe({
      next:()=>{this.message='Registro eliminado correctamente.';this.load();},
      error:err=>this.message=err.error?.mensaje || 'No se pudo eliminar el registro.'
    });
  }
  idKey() { return this.active==='productos'?'id_producto':this.active==='vendedores'?'id_vendedor':'id_venta'; }
  display(row:any,key:string) {
    const val=row[key];
    if (key==='fecha_venta' && val) return new Date(val).toLocaleString();
    if (typeof val==='boolean') return val?'Sí':'No';
    return val ?? '—';
  }
}

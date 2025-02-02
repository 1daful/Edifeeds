export interface IRepository {
    //setItems(collName: string, items: Record<string, any>[]): void;
    addItem(collName: string, item?: Record<string, any>): any;
    addItems(collName: string, param: Record<string, any>[]): any;
    readItem(collName?: string, field?: string, value?: string): Promise<Record<string, any>>;
    readItems(collName?: string, params?: Record<string, any>, param?: Record<string, any>, op?: any, val?: number): Promise<Record<string, any>[]>;
    updateItem(docId: any, param: Record<string, any>, collName?: string): void;
    deleteItem(docId: any,  collName?: string): void;
    //setChild(subPath: string, item: Record<string, any>): void;
    find(filters?: Record<string, any>, collName?: string): Promise<any>
    search(field: string, query: string, collName?: string): Promise<any>
}
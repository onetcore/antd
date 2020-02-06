import { SortOrder } from "antd";

/**
 * 分页数据接口。
 */
export interface DataPagination<T = {}> {
    /**
     * 当前页码。
     */
    current: number;
    /**
     * 每页显示记录数。
     */
    pageSize: number;
    /**
     * 总记录数。
     */
    size?: number;
    /**
     * 总页数。
     */
    pages?: number;
    /**
     * 数据集合。
     */
    data: T[];

    /**
     * 排序。
     */
    sb?: string;

    /**
     * 排序类型。
     */
    so?: SortOrder;
}
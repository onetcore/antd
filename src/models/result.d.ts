import { SortOrder } from "antd";

/**
 * 分页数据接口。
 */
export interface DataPagination<T = {}> extends DataResult<T> {
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
    total?: number;
    /**
     * 总页数。
     */
    pages?: number;
    /**
     * 排序。
     */
    sb?: string;

    /**
     * 排序类型。
     */
    so?: SortOrder;
}

/**
 * 返回结果。
 */
export interface Result {
    /**
     * 返回状态。
     */
    status: boolean;
    /**
     * 错误消息。
     */
    message?: string;
}

/**
 * 返回数据结果。
 */
export interface DataResult<T = {}> extends Result {
    /**
     * 数据列表。
     */
    data: T[];
}
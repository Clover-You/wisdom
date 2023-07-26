package top.ctong.wisdom.common.utils;

import com.baomidou.mybatisplus.core.metadata.IPage;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * █████▒█      ██  ▄████▄   ██ ▄█▀     ██████╗ ██╗   ██╗ ██████╗
 * ▓██   ▒ ██  ▓██▒▒██▀ ▀█   ██▄█▒      ██╔══██╗██║   ██║██╔════╝
 * ▒████ ░▓██  ▒██░▒▓█    ▄ ▓███▄░      ██████╔╝██║   ██║██║  ███╗
 * ░▓█▒  ░▓▓█  ░██░▒▓▓▄ ▄██▒▓██ █▄      ██╔══██╗██║   ██║██║   ██║
 * ░▒█░   ▒▒█████▓ ▒ ▓███▀ ░▒██▒ █▄     ██████╔╝╚██████╔╝╚██████╔╝
 * ▒ ░   ░▒▓▒ ▒ ▒ ░ ░▒ ▒  ░▒ ▒▒ ▓▒     ╚═════╝  ╚═════╝  ╚═════╝
 * ░     ░░▒░ ░ ░   ░  ▒   ░ ░▒ ▒░
 * ░ ░    ░░░ ░ ░ ░        ░ ░░ ░
 * ░     ░ ░      ░  ░
 * Copyright 2023 Clover You.
 * <p>
 * 分页设置
 * </p>
 *
 * @author Clover
 * @date 2023-07-26 16:10
 */
@Data
@Schema(description = "分页响应结构")
public class PageResp implements Serializable {

    @Serial
    private static final long serialVersionUID = 7716678547495664955L;
    /**
     * 列表数据
     */
    @Schema(description = "列表数据", requiredMode = Schema.RequiredMode.REQUIRED)
    private List<?> list;

    /**
     * 当前页
     */
    @Schema(description = "当前页", requiredMode = Schema.RequiredMode.REQUIRED)
    private long currentPage;

    /**
     * 总页数
     */
    @Schema(description = "总页数", requiredMode = Schema.RequiredMode.REQUIRED)
    private long totalPage;

    /**
     * 页大小
     */
    @Schema(description = "页大小", requiredMode = Schema.RequiredMode.REQUIRED)
    private long pageSize;

    /**
     * 总记录
     */
    @Schema(description = "总记录", requiredMode = Schema.RequiredMode.REQUIRED)
    private long total;

    public PageResp(IPage<?> page) {
        this.list = page.getRecords();
        this.currentPage = page.getCurrent();
        this.totalPage = page.getPages();
        this.pageSize = page.getSize();
        this.total = page.getTotal();
    }

}

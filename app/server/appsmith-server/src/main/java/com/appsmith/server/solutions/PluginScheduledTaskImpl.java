package com.appsmith.server.solutions;

import com.appsmith.server.helpers.PluginUtils;
import com.appsmith.server.solutions.ce.PluginScheduledTaskCEImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;


@Slf4j
@Component
public class PluginScheduledTaskImpl extends PluginScheduledTaskCEImpl implements PluginScheduledTask {

    public PluginScheduledTaskImpl(PluginUtils pluginUtils) {

        super(pluginUtils);
    }
}

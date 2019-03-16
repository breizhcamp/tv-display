-- Make sure the clones counter is defined; do nothing if it is
-- This feature requires at least devilspie2 0.22
if (clones==nil) then clones=1; end

debug_print("application_name: " .. get_application_name());

chromium_window = "Chromium"

if (get_window_name():sub(-#chromium_window) == chromium_window) then
	debug_print("Window Name: " .. get_window_name());
	debug_print("Application name: " .. get_application_name())
	
	pin_window();
	set_window_fullscreen(false);
	unmaximize();
	undecorate_window();
	set_window_position(1920,0);
	set_window_fullscreen(true);
	maximize();
	unpin_window();
end


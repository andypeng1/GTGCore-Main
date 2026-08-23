Add-Type -TypeDefinition 'using System;using System.Runtime.InteropServices;public class W5{[DllImport("user32.dll")]public static extern bool SetWindowPos(IntPtr h,IntPtr after,int x,int y,int cx,int cy,uint flags);[DllImport("user32.dll")]public static extern bool ShowWindow(IntPtr h,int cmd);[DllImport("user32.dll")]public static extern bool GetWindowRect(IntPtr h,out RECT r);[DllImport("user32.dll")]public static extern bool SetForegroundWindow(IntPtr h);public struct RECT{public int Left,Top,Right,Bottom;}}';
$p = Get-Process java -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowHandle -ne 0 } | Select-Object -First 1
if ($p) {
    $h = $p.MainWindowHandle
    [W5]::ShowWindow($h, 9) | Out-Null
    [W5]::SetWindowPos($h, [IntPtr]::Zero, 0, 0, 1000, 640, 0x0040 -bor 0x0010) | Out-Null
    Start-Sleep -Milliseconds 800
    [W5]::SetForegroundWindow($h) | Out-Null
    Start-Sleep -Milliseconds 500
    $r = New-Object W5+RECT
    [W5]::GetWindowRect($h, [ref]$r) | Out-Null
    Write-Output ("RECT=" + $r.Left + "," + $r.Top + "," + $r.Right + "," + $r.Bottom)
} else {
    Write-Output "NO WINDOW"
}

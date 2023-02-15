package com.function.sessionFunction.service;

import com.function.sessionFunction.compileDto.CompileDto;

public interface SessionFunctionService {

	String ChangeClassName(CompileDto compiledto);
	String judge(CompileDto compileDto);

	// String MakeVisualizationCode(CompileDto compileVariable);
}
